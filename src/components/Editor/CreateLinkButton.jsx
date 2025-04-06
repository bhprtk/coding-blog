import React, { useState } from 'react';
import { EditorState, RichUtils } from 'draft-js';
import IconButton from '@material-ui/core/IconButton';
import LinkIcon from '@material-ui/icons/InsertLink';
import AddLinkDialog from './AddLinkDialog';

function CreateLinkButton(props) {
  //////////////////////////////////////////////////////////// STATE VARIABLES
  const [currentLinkValue, setCurrentLinkValue] = useState('');
  const [openAddLinkDialogVar, setOpenAddLinkDialogVar] = useState(false);
  /////////////////////////////////////////////////////// CREATE LINK FUNCTION
  const promptForLink = () => {
    const { editorState } = props;
    const selection = editorState.getSelection()    
    if(!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

      let url = '';
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }

      setOpenAddLinkDialogVar(true);
      setCurrentLinkValue(url);
    }
  }
  //////////////////////////////////////////////////////////// CLOSE DIALOG
  const closeAddLinkDialogFn = () => {
    setOpenAddLinkDialogVar(false);
    setCurrentLinkValue('');
  }
  ////////////////////////////////////////////// ON CHANGE LINK VALUE FUNCTION
  const onChangeLinkValueFn = event => {
    const { value } = event.target;
    setCurrentLinkValue(value);
  }
  /////////////////////////////// SUBMIT LINK FUNCTION TO DELETE LINK IF EMPTY
  const submitLinkFn = () => {
    const { editorState, onChange } = props;
    const selectionState = editorState.getSelection()
    if(currentLinkValue) {
			confirmLinkFn(currentLinkValue)
		} else {
			onChange(RichUtils.toggleLink(editorState, selectionState, null))
		}
		closeAddLinkDialogFn()
  }
  ///////////////////////////////////////////////////// CONFIRM LINK FUNCTION
  const confirmLinkFn = () => {
    const { editorState, onChange } = props;
    // currentLinkValue from state
    const contentState = editorState.getCurrentContent()
		const contentStateWithEntity = contentState.createEntity(
			'LINK',
			'MUTABLE',
			{ url: currentLinkValue }
     );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity })
    onChange(RichUtils.toggleLink(
      newEditorState,
      newEditorState.getSelection(),
      entityKey
    ));
    closeAddLinkDialogFn();
  }
  //////////////////////////////////////////////////////////////////// RENDER
  return (
    <div>
      <IconButton onClick={promptForLink}>
        <LinkIcon 
          style={{ color: props.linkButtonColor }}
        />
      </IconButton>
      <AddLinkDialog 
        open={openAddLinkDialogVar}
        close={closeAddLinkDialogFn}
        confirmLink={confirmLinkFn}
        currentLinkValue={currentLinkValue}
        onChangeLinkValue={onChangeLinkValueFn}
        submitLink={submitLinkFn}
      />
    </div>
  )
}

export default CreateLinkButton