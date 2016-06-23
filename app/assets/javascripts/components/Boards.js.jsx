class Boards extends React.Component {
	constructor(props) {
		super(props);
		this.state = {boards: props.boards, show: false};
		this.deleteBoard = this.deleteBoard.bind(this);
		this.showBoard = this.showBoard.bind(this);
		this.state = { board: { name: '', description:''}, edit: false};
		this.toggleEdit = this.updateBoard.bind(this);
		this.updateBoard = this.updateBoard.bind(this);
	}

	toggleEdit() {
		this.setState({ edit: !this.state.edit });
	}

	updateBoard(id, board) {
		$.ajax({
			url: `/boards/${id}`,
			type: 'PUT',
			data: { board: {...board} }
		}).done( board => {
			let boards = this.state.boards;
			let editBoard = boards.find( b => b.id === board.id );
			editBoard.name = board.name;
			editBoard.description = board.description;
			this.setState({boards: boards});
		}).fail( data => {
			alert('Not updated');
		});
	}

	showBoard(board) {
		this.setState({ show: true, board })
	}

	addBoard(board) {
		this.setState({boards: [{...board},...this.state.boards] })
	}

	edit() {
		return(
			<div className="col s12 m4">
				<div className="card blue-grey">
					<div className="card-content">
						<input ref="name" placeholder="Name" required={true} defaultValue={this.props.name} />
						<input ref="description" placeholder="Description" required={true} defaultValue={this.props.description} />
					</div>
					<div className="card-action">
						<button onClick={this.toggleEdit} className="btn blue">Cancel</button>
						<button onClick={this.updateBoard} className="btn">Update</button>
					</div>
				</div>
			</div>
		);
	}

	deleteBoard(id) {
		$.ajax({
			url: `/boards/${id}`,
			type: 'DELETE',
			dataType: 'JSON'
		}).done( data => {
			let boards = this.state.boards;
			let index = boards.findIndex( b => b.id === id );
			this.setState({
				boards: [
				...boards.slice(0, index),
				...boards.slice(index + 1, boards.length)
				]
			});
		}).fail(data => {
			alert('Board did not delete.');
		});
	}

	

	boardBack() {
		this.setState({ show: false });
	}

	 render() {
	 	let board = this.state.board

	if(this.state.edit){
	 	return this.edit();
	} else {
	 	return this.show();
	}

  if(this.state.show) {
    return(
      <div>
        <h3>{board.name}</h3>
        <i>{board.description}</i>
        <button className="btn" onClick={this.boardBack.bind(this)}>Back</button>
        <Lists boardId={board.id} />
        <hr />
      </div>
    );
  } else {
    let boards = this.state.boards.map( board => {
      return(<Board key={`board-${board.id}`} {...board} deleteBoard={this.deleteBoard} showBoard={this.showBoard} />);
  });

  return(
    <div>
    <NewBoard addBoard={this.addBoard.bind(this)} />
    <div className='row'>
      {boards}
    </div>
    </div>
  )
}