import React, { Component } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
// import TextField from 'material-ui/TextField/TextField';
import { githubGist } from 'react-syntax-highlighter/styles/hljs';

class CodeBlock extends Component {

	render() {
    const { block } = this.props;
		let text = block.getText()
		return (
			<SyntaxHighlighter
        language='javascript'
        style={githubGist}
				customStyle={{
					background: '#f7f8fa',
					// background: '#242a2f',
					borderRadius: 0,
          border: 'none',
          fontSize: 16
				}}>
				{text}
			</SyntaxHighlighter>
		)
	}
}

export default CodeBlock
