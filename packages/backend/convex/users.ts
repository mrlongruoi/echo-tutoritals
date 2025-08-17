import { mutation, query } from "./_generated/server";

export const getMany = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return users;
  },
});

export const add = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
      throw new Error("Không được xác thực");
    }

    const orgId = identity.orgId as string;

    if (!orgId) {
      throw new Error("Thiếu tổ chức");
    }

    throw new Error("Kiểm tra theo dõi");

    const userId = await ctx.db.insert("users", {
      name: "Mrlongruoi",
    });
    
    return userId;
  },
});
