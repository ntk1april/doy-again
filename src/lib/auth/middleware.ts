import { NextRequest } from "next/server";
import { verifyToken } from "./utils";

/**
 * Get user ID from Authorization header
 * Returns null if token is invalid or missing
 */
export function getUserIdFromRequest(request: NextRequest): string | null {
  try {
    const authHeader = request.headers.get("authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix
    const payload = verifyToken(token);

    if (!payload) {
      return null;
    }

    return payload.userId;
  } catch (error) {
    console.error("Error extracting user ID:", error);
    return null;
  }
}

/**
 * Require authentication for API routes
 * Throws error if user is not authenticated
 */
export function requireAuth(request: NextRequest): string {
  const userId = getUserIdFromRequest(request);

  if (!userId) {
    throw new Error("Unauthorized");
  }

  return userId;
}
