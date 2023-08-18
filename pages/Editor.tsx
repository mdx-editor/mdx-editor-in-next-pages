// You can use this code in a separate component that's imported in your pages.
import { toolbarPlugin, corePluginHooks, imagePlugin, imagePluginHooks } from '@mdxeditor/editor';
import {$getSelection, $isRangeSelection} from 'lexical'
import '@mdxeditor/editor/style.css';
import React, { useCallback } from 'react';
import EmojiPicker from 'emoji-picker-react';
const { MDXEditor , headingsPlugin, listsPlugin, linkPlugin, quotePlugin, markdownShortcutPlugin } = await import('@mdxeditor/editor')

// using the emoji picker is just an example, you can put it in a dropdown, popover, etc. 
const EmojiButton = () => {
  const [editor] = corePluginHooks.useEmitterValues('activeEditor')
  const insertText = useCallback((text: string) => {
      editor?.focus(() => {
        editor?.update(() => {
          const selection = $getSelection() 
          if (selection && $isRangeSelection(selection)) {
            // the code point below is a smiley face emoji https://www.compart.com/en/unicode/U+1F600
            // You can find more code points here: https://unicode-table.com/en/
            selection.insertText(text)
            // the picker used steals the focus, restore it after the emoji is inserted
            setTimeout(() => {
              editor.focus()
            }, 100)
          }
        })
      })
  }, [editor])

  return <EmojiPicker onEmojiClick={(emoji) => insertText(emoji.emoji)} />
}

// a simple button that inserts a gif. 
// You can use a fancier picker like the tenor picker: https://github.com/MrBartusek/gif-picker-react
const GifButton = () => {
  const [editor] = corePluginHooks.useEmitterValues('activeEditor')
  const insertImage = imagePluginHooks.usePublisher('insertImage')
  const onClick = useCallback((url: string) => {
    editor?.focus(() => {
      insertImage(url)
    })
  }, [insertImage, editor])

  return <button style={{background: 'red', color: 'white', padding: '2rem' }} onClick={() => onClick('https://media.giphy.com/media/3o7aD2jB0EFzYxY9fK/giphy.gif')}>Gif</button>
}

const Editor = () => {
    return <MDXEditor
      autoFocus
      onChange={console.log}
      markdown={'Hello world!'}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        linkPlugin(),
        quotePlugin(),
        markdownShortcutPlugin(),
        toolbarPlugin({toolbarContents: () => {return <><GifButton /> <EmojiButton /></>}}),
        // disable image resize, you probably don't want this
        imagePlugin({disableImageResize: true})
      ]}
    />
}

export default Editor
