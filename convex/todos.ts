import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getTodos = query({
    handler: async ctx => {
        const userId = await getAuthUserId(ctx)
        if (!userId) throw new Error('Unauthorised')
        return (await ctx.db.query('todos').filter(q => q.eq(q.field('userId'), userId)).collect()).reverse()
    }
})

export const createTodo = mutation({
    args: {
        title: v.string(),
        completed: v.boolean(),
    },
    handler: async (ctx, { completed, title }) => {
        const userId = await getAuthUserId(ctx)
        if (!userId) throw new Error('Unauthorised')
        return await ctx.db.insert('todos', { completed, title, userId })
    }
})

export const updateTodo = mutation({
    args: {
        id: v.id('todos'),
        title: v.string(),
        completed: v.boolean()
    },
    handler: async (ctx, { completed, id, title }) => {
        const userId = await getAuthUserId(ctx)
        if (!userId) throw new Error('Unauthorised')
        const existingTodo = await ctx.db.get(id)
        if (!existingTodo) throw new Error('Todo not found')
        if (existingTodo.userId !== userId) throw new Error('Unauthorized')
        return await ctx.db.patch(id, {
            title: title.trim() ? title : existingTodo.title,
            completed: completed ? completed : existingTodo.completed,
        })
    }
})

export const deleteTodo = mutation({
    args: { id: v.id('todos') },
    handler: async (ctx, { id, }) => {
        const userId = await getAuthUserId(ctx)
        if (!userId) throw new Error('Unauthorised')
        const existingTodo = await ctx.db.get(id)
        if (!existingTodo) throw new Error('Todo not found')
        if (existingTodo.userId !== userId) throw new Error('Unauthorized')
        return await ctx.db.delete(id)
    }
})