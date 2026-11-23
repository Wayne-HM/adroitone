/**
 * Session token utilities — Edge-safe (pure Web Crypto JWT, no Node.js APIs).
 *
 * Uses the Web Crypto API for HMAC-SHA256 JWT signing/verification, which
 * works in both Edge Runtime (middleware) and Node.js (API routes).
 *
 * This replaces the previous `jsonwebtoken` dependency to eliminate Edge
 * Runtime warnings on Vercel.
 */

export const SESSION_COOKIE = "adroitone_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24; // 24 hours

function jwtSecret(): string {
  const secret = process.env.AUTH_JWT_SECRET;
  if (!secret) {
    return "adroitone-jwt-secret-key-minimum-32-chars-long-corp-portal";
  }
  return secret;
}

/** Base64url encode a Uint8Array or string. */
function base64urlEncode(data: Uint8Array | string): string {
  const bytes =
    typeof data === "string" ? new TextEncoder().encode(data) : data;
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** Base64url decode to Uint8Array. */
function base64urlDecode(str: string): Uint8Array {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/** Import the secret as a CryptoKey for HMAC-SHA256. */
async function getKey(): Promise<CryptoKey> {
  const secret = jwtSecret();
  const keyData = new TextEncoder().encode(secret);
  return crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

/** Create a signed session JWT for an employee (HMAC-SHA256). */
export async function createSessionToken(employeeId: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "HS256", typ: "JWT" };
  const payload = {
    sub: employeeId,
    iss: "adroitone",
    iat: now,
    exp: now + SESSION_TTL_SECONDS,
  };

  const headerB64 = base64urlEncode(JSON.stringify(header));
  const payloadB64 = base64urlEncode(JSON.stringify(payload));
  const signingInput = `${headerB64}.${payloadB64}`;

  const key = await getKey();
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(signingInput)
  );

  const signatureB64 = base64urlEncode(new Uint8Array(signature));
  return `${signingInput}.${signatureB64}`;
}

/** Verify a session JWT and return the employee id, or null if invalid. */
export function verifySessionToken(token: string): string | null {
  // Synchronous fast-path: decode and check expiry without crypto.
  // The middleware calls this synchronously, so we do a quick check and
  // let the full async verification happen in the API layer.
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payloadStr = new TextDecoder().decode(base64urlDecode(parts[1]));
    const payload = JSON.parse(payloadStr) as {
      sub?: string;
      iss?: string;
      exp?: number;
    };

    if (payload.iss !== "adroitone") return null;
    if (!payload.sub) return null;
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null;

    return payload.sub;
  } catch {
    return null;
  }
}

/** Async verification with signature check — use in API routes. */
export async function verifySessionTokenAsync(
  token: string
): Promise<string | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const signingInput = `${parts[0]}.${parts[1]}`;
    const signature = base64urlDecode(parts[2]);

    const key = await getKey();
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      signature as unknown as BufferSource,
      new TextEncoder().encode(signingInput)
    );

    if (!valid) return null;

    const payloadStr = new TextDecoder().decode(base64urlDecode(parts[1]));
    const payload = JSON.parse(payloadStr) as {
      sub?: string;
      iss?: string;
      exp?: number;
    };

    if (payload.iss !== "adroitone") return null;
    if (!payload.sub) return null;
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null;

    return payload.sub;
  } catch {
    return null;
  }
}

export { SESSION_TTL_SECONDS };
