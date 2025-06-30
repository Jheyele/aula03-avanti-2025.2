import jwt from "jsonwebtoken";

export default function authenticate(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return response.status(401).json({ error: "Token not provided or malformed" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT);

    if (!decoded?.userId) {
      return response.status(401).json({ error: "Invalid token payload" });
    }

    request.userId = decoded.userId; // Make user ID available to downstream routes/controllers

    return next();
  } catch (error) {
    return response.status(401).json({ error: "Invalid or expired token" });
  }
}
