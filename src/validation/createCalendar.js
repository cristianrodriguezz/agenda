import { z } from "zod"

export const calendarSchema = z.object({
  dataCalendar: z.array(
    z.object({
      activityid: z.number({ required_error: 'Activity id es requerido', invalid_type_error: 'Activity id tiene que ser un número'}).int().positive(),
      calendar: z.array(
        z.object({
          idCalendar: z.number().int().positive().nullish(),
          year: z.number().int().positive().min(2023).max(2050),
          month: z.number().int().positive().min(1).max(12),
          dayid: z.number().int().min(0).max(6),
          appointmentsavailableforranges: z.number().int().min(1).max(10),
          untilhours: z
            .string()
            .regex(
              /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/,
              { error: 'Invalid untilhours format' }
            ),
          sincehours: z
            .string()
            .regex(
              /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/,
              { error: 'Invalid sincehours format' }
            ),
          accountid: z.number().int().positive(),
          timerangesid: z.number().int().positive()
        })
      ),
    })
  ),
})