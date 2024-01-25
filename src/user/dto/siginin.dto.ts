import { Exclude } from "class-transformer"
import { IsNotEmpty } from "class-validator"

export class signin {
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  password: string

}