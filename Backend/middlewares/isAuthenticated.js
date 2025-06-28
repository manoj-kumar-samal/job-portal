import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.token;

    // ✅ Log to debug cookie presence
    console.log("Token from cookies:", token);

    if (!token) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // ❌ Don't use `await` here — jwt.verify is synchronous
    const decode = jwt.verify(token, process.env.SECRET_KEY);

    req.id = decode.userId;
    next();
  } catch (error) {
    console.error("JWT error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default isAuthenticated;
