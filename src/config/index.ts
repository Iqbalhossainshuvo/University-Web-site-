import dotenv from 'dotenv'
import Path from 'path'

dotenv.config({ path: Path.join(process.cwd(), '.env') })

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_student_password: process.env.DEFAULT_STUDENT_PASSWORD,
  hash_password: process.env.HASH_PASSWORD
}
