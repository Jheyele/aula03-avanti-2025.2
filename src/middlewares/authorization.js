import jwt from "jsonwebtoken";

export default function authorization(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return response.status(401).json({ error: "Token not provided or malformed" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT);

    if (!decoded?.isAdmin) {
      return response.status(403).json({ error: "Access denied: admin privileges required" });
    }

    // Armazena dados úteis no request para uso posterior
    request.userId = decoded.userId;
    request.isAdmin = decoded.isAdmin;

    return next();
  } catch (error) {
    return response.status(401).json({ error: "Invalid or expired token" });
  }
}