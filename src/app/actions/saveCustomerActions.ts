"use server"

import { eq } from "drizzle-orm"
import { flattenValidationErrors } from "next-safe-action"
import { redirect } from "next/navigation"

import { db } from "@/db"
import { customers } from "@/db/schemas"
import { actionClient } from "@/lib/safe-actions"
import { upsertCustomerSchema, type insertCustomerSchemaType } from "@/zod-schemas/customer"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export const saveCustomerAction = actionClient 
    .metadata({ actionName: 'saveCustomerAction' })
    .schema(upsertCustomerSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors,
    })
    .action(async ({
        parsedInput: customer
    }: {parsedInput: insertCustomerSchemaType}) => {
        
        const { isAuthenticated } = getKindeServerSession()
        
        const isAuth = await isAuthenticated()
        
        if (!isAuth) redirect('/login')
            
        // New Customer
        if (customer.id === 0) {
            const result = await db.insert(customers).values({
                firstName: customer.firstName,
                lastName: customer.lastName,
                email: customer.email,
                Phone: customer.Phone,
                adress1: customer.adress1,
                adress2: customer.adress2 || '',
                city: customer.city,
                state: customer.state,
                zip: customer.zip,
                notes: customer.notes || null,
            }).returning({ insertedId: customers.id})

            return { message: `Customer ID #${result[0].insertedId} created successfuly`}
        }
        // Existing Customer
        const result = await db.update(customers)
            .set({
                firstName: customer.firstName,
                lastName: customer.lastName,
                email: customer.email,
                Phone: customer.Phone,
                adress1: customer.adress1,
                adress2: customer.adress2?.trim() ?? null,
                city: customer.city,
                state: customer.state,
                zip: customer.zip,
                notes: customer.notes?.trim() ?? null,
            })
            .where(eq(customers.id, customer.id!))
            .returning({ updatedId: customers.id})

        return { message: `Customer ID #${result[0].updatedId} updated successfuly` }
    })
