import type { AccountInfo } from "@azure/msal-browser";
import type {
  IAnnotation,
  IChatItem,
  IFileAttachment,
  IMcpApprovalRequest,
  IUsageInfo,
} from "./chat";
import type { AppError } from "./errors";

export type {
  IAnnotation,
  IChatItem,
  IFileAttachment,
  IMcpApprovalRequest,
  IUsageInfo,
};

export interface ConversationSummary {
  id: string;
  title: string | null;
  createdAt: number;
}

export interface ConversationMessageInfo {
  role: string;
  content: string;
}

export interface AppState {
  auth: {
    status: "initializing" | "authenticated" | "unauthenticated" | "error";
    user: AccountInfo | null;
    error: string | null;
  };
  chat: {
    status: "idle" | "sending" | "streaming" | "error";
    messages: IChatItem[];
    currentConversationId: string | null;
    error: AppError | null;
    streamingMessageId?: string;
    recoveredInput?: string;
    recoveredAttachments?: IFileAttachment[];
    editSnapshot?: IChatItem[];
    regenerateText?: string;
    pendingMessages: Array<{ text: string; files?: File[] }>;
  };
  conversations: {
    list: ConversationSummary[];
    isLoading: boolean;
    sidebarOpen: boolean;
    hasMore: boolean;
  };
  ui: {
    chatInputEnabled: boolean;
  };
}

export type AppAction =
  | { type: "AUTH_INITIALIZED"; user: AccountInfo }
  | { type: "AUTH_UNAUTHENTICATED" }
  | { type: "AUTH_TOKEN_EXPIRED" }
  | { type: "AUTH_ERROR"; error: string }
  | { type: "CHAT_SEND_MESSAGE"; message: IChatItem }
  | { type: "CHAT_LOAD_MESSAGES"; messages: IChatItem[] }
  | { type: "CHAT_START_STREAM"; conversationId?: string; messageId: string }
  | { type: "CHAT_STREAM_CHUNK"; messageId: string; content: string }
  | { type: "CHAT_STREAM_ANNOTATIONS"; messageId: string; annotations: IAnnotation[] }
  | { type: "CHAT_STREAM_TOOL_USE"; messageId: string; toolName: string }
  | { type: "CHAT_MCP_APPROVAL_REQUEST"; messageId: string; approvalRequest: IMcpApprovalRequest; previousResponseId: string | null }
  | { type: "CHAT_MCP_APPROVAL_RESOLVED"; approvalRequestId: string; resolved?: "approved" | "rejected" }
  | { type: "CHAT_STREAM_COMPLETE"; usage: IUsageInfo }
  | { type: "CHAT_CANCEL_STREAM" }
  | { type: "CHAT_ERROR"; error: AppError }
  | { type: "CHAT_CLEAR_ERROR" }
  | { type: "CHAT_CLEAR" }
  | { type: "CHAT_ADD_ASSISTANT_MESSAGE"; messageId: string }
  | { type: "CHAT_LOAD_CONVERSATION"; conversationId: string; messages: IChatItem[] }
  | { type: "CHAT_STREAM_RETRY"; messageId: string; attempt: number; maxRetries: number }
  | { type: "CHAT_RECOVER_MESSAGE"; messageText: string; error: AppError; retryCount: number }
  | { type: "CHAT_CONSUMED_RECOVERED_INPUT" }
  | { type: "CHAT_QUEUE_MESSAGE"; text: string; files?: File[] }
  | { type: "CHAT_DEQUEUE_MESSAGE"; index: number }
  | { type: "CHAT_CLEAR_QUEUE" }
  | { type: "CHAT_REGENERATE" }
  | { type: "CHAT_EDIT_MESSAGE"; messageId: string; newText: string }
  | { type: "CHAT_CANCEL_EDIT" }
  | { type: "CHAT_CONSUMED_REGENERATE" }
  | { type: "CONVERSATIONS_SET_LIST"; conversations: ConversationSummary[]; hasMore: boolean; append?: boolean }
  | { type: "CONVERSATIONS_LOADING" }
  | { type: "CONVERSATIONS_LOADING_DONE" }
  | { type: "CONVERSATIONS_TOGGLE_SIDEBAR" }
  | { type: "CONVERSATIONS_REMOVE"; conversationId: string };

export const initialAppState: AppState = {
  auth: { status: "initializing", user: null, error: null },
  chat: {
    status: "idle",
    messages: [],
    currentConversationId: null,
    error: null,
    streamingMessageId: undefined,
    recoveredInput: undefined,
    recoveredAttachments: undefined,
    editSnapshot: undefined,
    regenerateText: undefined,
    pendingMessages: [],
  },
  conversations: { list: [], isLoading: false, sidebarOpen: false, hasMore: false },
  ui: { chatInputEnabled: true },
};
