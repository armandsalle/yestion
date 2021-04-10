import cn from 'classnames'

const EditableContent = ({ children, save, setEditing, as, editing, inputRef }) => {
  const asTitle = 'text-2xl'
  const asListItem = 'transform translate-x-4'

  return (
    <div
      onMouseEnter={() => setEditing(true)}
      onMouseLeave={() => setEditing(false)}
      className={cn(
        `template-text border-none outline-none w-full`,
        as === 'Title' && asTitle,
        as === 'List' && asListItem
      )}
      onClick={!editing ? () => setEditing(true) : undefined}
      contentEditable={true}
      ref={inputRef}
      onBlur={save}
      suppressContentEditableWarning={true}
      placeholder="Type something"
    >
      {children}
    </div>
  )
}

export default EditableContent
