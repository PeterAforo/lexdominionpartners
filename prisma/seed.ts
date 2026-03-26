import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  await prisma.user.upsert({
    where: { email: 'admin@lexdominion.com' },
    update: {},
    create: {
      email: 'admin@lexdominion.com',
      name: 'Admin',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  })
  console.log('Admin user created: admin@lexdominion.com / admin123')

  // Create services
  const services = [
    { title: 'Corporate Law', slug: 'corporate-law', description: 'Strategic counsel for businesses.', icon: 'Building2', order: 1 },
    { title: 'Litigation', slug: 'litigation', description: 'Effective representation in disputes.', icon: 'Gavel', order: 2 },
    { title: 'Real Estate', slug: 'real-estate', description: 'Legal support for property matters.', icon: 'Home', order: 3 },
    { title: 'Family Law', slug: 'family-law', description: 'Guidance through family legal matters.', icon: 'Users', order: 4 },
    { title: 'Criminal Defense', slug: 'criminal-defense', description: 'Vigorous defense of your rights.', icon: 'ShieldAlert', order: 5 },
    { title: 'Intellectual Property', slug: 'intellectual-property', description: 'Full-spectrum IP protection.', icon: 'Lightbulb', order: 6 },
    { title: 'Immigration', slug: 'immigration', description: 'Expert immigration guidance.', icon: 'Globe', order: 7 },
    { title: 'Tax Law', slug: 'tax-law', description: 'Strategic tax planning solutions.', icon: 'Calculator', order: 8 },
  ]

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    })
  }
  console.log('Services seeded')

  // Create testimonials
  const testimonials = [
    { name: 'Robert Thompson', company: 'Thompson Industries', content: 'Lex Dominion Partners handled our merger with exceptional skill and attention to detail.', rating: 5, order: 1 },
    { name: 'Sarah Mitchell', company: 'Mitchell & Co.', content: 'Their family law team provided compassionate and effective guidance during a difficult time.', rating: 5, order: 2 },
    { name: 'James Chen', company: 'TechVentures Inc.', content: 'Outstanding IP protection for our technology portfolio. Highly recommended.', rating: 5, order: 3 },
  ]

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial })
  }
  console.log('Testimonials seeded')

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
