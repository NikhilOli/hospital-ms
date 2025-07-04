import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();

async function main() {
  await prisma.doctor.createMany({
    data: [
      { name: "Dr. Asha Sharma", department: "Cardiology", specialization: "Heart Specialist" },
      { name: "Dr. Rajesh Shrestha", department: "Neurology", specialization: "Brain & Nerves" },
      { name: "Dr. Sunita Karki", department: "Pediatrics", specialization: "Child Health" },
      { name: "Dr. Bikash Adhikari", department: "Orthopedics", specialization: "Bone & Joint Specialist" },
      { name: "Dr. Anuja Thapa", department: "Gynecology", specialization: "Women's Health" }
    ]
  });
}
main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
