import prisma from "../config/prisma";
import { hashPassword, comparePassword } from "../utils/password";
import { generateToken } from "../utils/jwt";

export class AuthService {
  async register(name: string, email: string, password: string) {
    const existingAdmin = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      throw new Error("Admin already exists");
    }

    const hashedPassword = await hashPassword(password);

    const admin = await prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = generateToken(admin.id);

    return {
      admin,
      token,
    };
  }

  async login(email: string, password: string) {
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      throw new Error("Invalid email or password");
    }

    const isMatch = await comparePassword(password, admin.password);

    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    const token = generateToken(admin.id);

    return {
      admin,
      token,
    };
  }
}

export default new AuthService();