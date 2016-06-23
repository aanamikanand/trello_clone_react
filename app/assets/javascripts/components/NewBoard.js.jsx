class NewBoard extends React.Component {
	constructor(props) {
		super(props)
	}

	addBoard(e) {
		//prevent default form submit
		e.preventDefault();
		//make ajax call to create a nnew board
		$.ajax({
			url: '/boards',
			type: 'POST',
			data: { board: {name: this.refs.name.value, 
											description: this.refs.description.value}},
			dataType: 'JSON'
		}).done( board => {
			this.props.addBoard(board);
			this.refs.addForm.reset();
		}).fail( response => {
			alert(response.errors.toString());
		});
		// clear out form or shoe error
	}

	render() {
		return(
			<div className='col s12 m10 offset-m1'>
				<h4>Add New Board</h4>
				<form ref="addForm" onSubmit={this.addBoard.bind(this)}>
					<input type="text" placeholder="Board Name" ref="name" required />
					<textarea placeholder="board description" ref="description"></textarea>
					<input type="submit" className="btn" />
				</form>
			</div>
		)
	}
}