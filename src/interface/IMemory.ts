export interface IMemory {
  id: number
  capsule_id: number
  content: string | null
  memory_type: 'text' | 'image' | 'video' | 'audio'
  s3_url: string | null
  rails_url: string | null
  created_at: string
  updated_at: string
}
