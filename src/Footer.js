import React from 'react';
import PropTypes from 'prop-types';

class Footer extends React.Component{
	propTypes = {
		images: PropTypes.array.isRequired,
		currentId: PropTypes.number,
		setCurrent: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);
		this.getActiveStyle = this.getActiveStyle.bind(this);
		this.changeCurrent = this.changeCurrent.bind(this);		
	}
	getActiveStyle(id){
		let s = {
			opacity: (id === this.props.currentId) ? 1 : .5
		};
		s.backgroundImage = `url(${this.props.images[id]})`;
		return s;
	}
	changeCurrent(e){
		let id = parseInt(e.target.getAttribute("data-id"));
		this.props.setCurrent(id);
	}
	render(){
		let footerClass="carousel-thumb";
		return (
			<div className="carousel-footer">
				<div className="box">
				{
					this.props.images.map((item, id) => (<div className={footerClass} key={id} data-id={id} style={this.getActiveStyle(id)} onClick={this.changeCurrent} />))
				}
				</div>
			</div>
		);
	}
}

export {Footer};
