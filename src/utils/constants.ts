// This is the classname group for selecting the main container, we listen for changes here
export const MAIN_CONTAINER = "#__next"

// This is the classname group for selecting the main container, we listen for changes here
export const CHAT_CONTAINER = "main .flex.flex-col.items-center.text-sm"

// This is the classname group for selecting the answer container
export const ANSWER_CONTAINER =
    ".group.w-full.text-gray-800.dark\\:text-gray-100.border-b.border-black\\/10.dark\\:border-gray-900\\/50.bg-gray-50.dark\\:bg-\\[\\#444654\\]";

// This extracts the actual content from the answer container
export const CONTENT_CONTAINER = '.w-full.break-words.dark\\:prose-invert'

// This is the classname group for selecting the button container
export const BUTTON_CONTAINER =
    ".text-gray-400.flex.self-end.lg\\:self-center.justify-center.mt-2.gap-3.md\\:gap-4.lg\\:gap-1.lg\\:absolute.lg\\:top-0.lg\\:translate-x-full.lg\\:right-0.lg\\:mt-0.lg\\:pl-2.visible";

// This is the container for modal
// Note: this does not have an ID
export const MODAL_CONTAINER = 'chatgpt-exporter-modal'

// This is the container for context menu
// Note: this does not have an ID
export const MENU_CONTAINER = 'chatgpt-exporter-menu'