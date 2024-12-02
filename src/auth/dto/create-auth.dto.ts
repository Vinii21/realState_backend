import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  IsArray,
  ArrayMinSize,
  IsIn,
} from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @IsString({ message: 'El campo debe ser cadena de texto.' })
  readonly name: string;
  @IsEmail({}, { message: 'El email debe tener un formato válido.' })
  readonly email: string;
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{16,}$/, {
    message:
      'La contraseña debe tener al menos 16 caracteres, una minúscula, una mayúscula y un número.',
  })
  readonly password: string;
  @IsArray({ message: 'El rol debe ser un arreglo de texto.' })
  @ArrayMinSize(1, { message: 'Debe haber al menos un rol definido.' })
  @IsIn(['user', 'admin'], {
    each: true,
    message: 'Los roles deben ser "user" o "admin".',
  })
  readonly role: string[];
}
