import { createClient } from '@supabase/supabase-js'

// Environment-specific schema prefixes
const getSchemaPrefix = () => {
  switch (process.env.NEXT_PUBLIC_ENV) {
    case 'production':
      return 'prod'
    case 'staging':
      return 'staging'
    default:
      return 'dev'
  }
}

// Database configuration with schema
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!, {
  db: {
    schema: getSchemaPrefix()
  }
}) 