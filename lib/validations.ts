import { z } from "zod";

// 1. Create News Article Schema
export const createNewsSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  content: z.string().min(100, "Article content is too short"),
  category: z.string(),
  imageUrl: z.string().optional(),
  isPublished: z.boolean().default(false),
});

// 2. Schedule Program Schema
export const scheduleProgramSchema = z.object({
  title: z.string().min(3),
  type: z.enum(["RADIO", "TV", "BOTH"]),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  hostId: z.string().cuid(),
});

// 3. Create Commercial Campaign Schema
export const createCampaignSchema = z.object({
  clientName: z.string().min(2),
  title: z.string().min(5),
  targetMedia: z.string(),
  placement: z.string().optional(),
  value: z.number().positive("Campaign value must be greater than 0"),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
});

// 4. Create Notice Schema
export const createNoticeSchema = z.object({
  title: z.string().min(5),
  body: z.string().min(10),
  urgency: z.string(),
  targetAudience: z.string(),
  isPinned: z.boolean().default(false),
});
