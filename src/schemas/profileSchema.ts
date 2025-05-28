import { z } from 'zod'

export const profileSchema = z.object({
  first_name: z.string().nonempty('El nombre es obligatorio'),
  last_name: z.string().nonempty('El apellido es obligatorio'),
  telephone: z.string().nonempty('El teléfono es obligatorio'),
  doc_type: z.string().nonempty('El tipo de documento es obligatorio'),
  doc_number: z.string().nonempty('El número de documento es obligatorio'),
  cuit_1: z.string().length(2, 'Debe tener 2 dígitos'),
  cuit_2: z.string().length(8, 'Debe tener 8 dígitos'),
  cuit_3: z.string().length(1, 'Debe tener 1 dígito'),
  gender: z.string(),
  birthday: z.string().nonempty('La fecha de nacimiento es obligatoria')
})