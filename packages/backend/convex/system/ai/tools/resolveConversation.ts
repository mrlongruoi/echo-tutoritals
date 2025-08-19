import { z } from "zod";
import { createTool } from "@convex-dev/agent";
import { internal } from "../../../_generated/api";
import { supportAgent } from "../agents/supportAgent";

export const resolveConversation = createTool({
  description: "Giải quyết một cuộc trò chuyện",
  args: z.object({}),
  handler: async (ctx) => {
    if (!ctx.threadId) {
      return "Thiếu ID chủ đề";
    }

    await ctx.runMutation(internal.system.conversations.resolve, {
      threadId: ctx.threadId,
    });

    await supportAgent.saveMessage(ctx, {
      threadId: ctx.threadId,
      message: {
        role: "assistant",
        content: "Cuộc trò chuyện đã được giải quyết.",
      },
    });

    return "Cuộc trò chuyện đã được giải quyết";
  },
});
