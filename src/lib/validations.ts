import { z } from 'zod'

// Booking
export const createBookingSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email().max(255),
  phone: z.string().min(1).max(50),
  service: z.string().optional(),
  date: z.string().min(1),
  time: z.string().min(1),
  message: z.string().max(2000).optional().nullable(),
})

export const updateBookingSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']),
})

// Contact
export const createContactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(255),
  phone: z.string().max(50).optional().nullable(),
  subject: z.string().min(1).max(300),
  message: z.string().min(1).max(5000),
})

export const updateContactSchema = z.object({
  isRead: z.boolean().optional(),
})

// Service
export const createServiceSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  description: z.string().min(1).max(5000),
  icon: z.string().max(100).optional().nullable(),
  image: z.string().url().max(500).optional().nullable(),
  isActive: z.boolean().optional(),
  order: z.number().int().optional(),
})

export const updateServiceSchema = createServiceSchema.partial()

// Team
export const createTeamSchema = z.object({
  name: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  title: z.string().min(1).max(200),
  bio: z.string().max(5000).optional().nullable(),
  image: z.string().url().max(500).optional().nullable(),
  email: z.string().email().max(255).optional().nullable(),
  phone: z.string().max(50).optional().nullable(),
  specialty: z.string().max(200).optional().nullable(),
  isActive: z.boolean().optional(),
  order: z.number().int().optional(),
})

export const updateTeamSchema = createTeamSchema.partial()

// Blog
export const createBlogSchema = z.object({
  title: z.string().min(1).max(300),
  slug: z.string().min(1).max(300),
  excerpt: z.string().max(1000).optional().nullable(),
  content: z.string().min(1),
  image: z.string().max(500).optional().nullable(),
  category: z.string().max(100).optional().nullable(),
  tags: z.array(z.string()).optional(),
  published: z.boolean().optional(),
  authorId: z.string().min(1),
})

export const updateBlogSchema = createBlogSchema.partial().omit({ authorId: true })

// Testimonial
export const createTestimonialSchema = z.object({
  name: z.string().min(1).max(200),
  title: z.string().max(200).optional().nullable(),
  content: z.string().min(1).max(5000),
  rating: z.number().int().min(1).max(5).optional(),
  image: z.string().max(500).optional().nullable(),
  isActive: z.boolean().optional(),
  order: z.number().int().optional(),
})

export const updateTestimonialSchema = createTestimonialSchema.partial()

// Settings
export const updateSettingsSchema = z.record(z.string(), z.string())
