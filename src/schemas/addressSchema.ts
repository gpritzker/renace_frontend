import { z } from 'zod'

export const addressSchema = z.object({
  id: z.number().optional(),
  first_name: z.string().min(1, 'Nombre requerido'),
  last_name: z.string().min(1, 'Apellido requerido'),
  doc_type: z.string().min(1, 'Tipo de documento requerido'),
  doc_number: z.string().min(1, 'Número de documento requerido'),
  telephone: z.string().min(1, 'Teléfono requerido'),
  address: z.string().min(1, 'Calle requerida'),
  street_number: z.string().min(1, 'Número requerido'),
  address_2: z.string().optional(),
  country: z.string().min(1, 'País requerido'),
  city: z.string().min(1, 'Ciudad requerida'),
  state: z.string().min(1, 'Provincia requerida'),
  zip: z.string().min(1, 'Código postal requerido')
})

export type AddressFormData = z.infer<typeof addressSchema>
