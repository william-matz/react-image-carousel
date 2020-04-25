import React from 'react';
import PropTypes from 'prop-types';
import {Footer} from './Footer';
import {
	CSSTransition,
	TransitionGroup
} from 'react-transition-group';

const Fade = ({ children, ...props }) => (
	<CSSTransition
		{...props}
		timeout={{enter:250, exit:0}}
		classNames="carouselContent"
	>
		{children}
	</CSSTransition>
);

class Carousel extends React.Component{
	propTypes = {
		images: PropTypes.array.isRequired,
		loop: PropTypes.bool ,
		autoplay: PropTypes.number 
	};
	
	defaultProps = {
		images: [],
		loop: true
	};

	constructor(props) {
		super(props);
		this.state ={
			currentId: 0
		};
		this.setCurrent = this.setCurrent.bind(this);
		this.addCurrent = this.addCurrent.bind(this);
		this.subCurrent = this.subCurrent.bind(this);
	}
	
	componentDidMount () {
		if (this.props.autoplay > 0) {
			this._timer = setInterval( () => this.setCurrent(this.state.currentId + 1), this.props.autoplay);
		}		
	}
	componentWillUnmount () {
		if (this._timer) {
			clearInterval(this._timer );
		}
	}
	addCurrent() {
		this.setCurrent( this.state.currentId + 1);
	}
	subCurrent() {
		this.setCurrent( this.state.currentId - 1);
	}
	setCurrent(id) {
		let images = this.props.images || [];
		if (this.props.loop) {
			id = (id + images.length) % images.length;
		} else {
			id = (id < 0)? 0: ((id >= images.length)? images.length - 1 : id);
		}
		this.setState({	currentId: id});
	}
	render() {
		let images = this.props.images || [];
		let current = images[this.state.currentId];
		return (
			<div className="carousel">
				<div className="carousel-main" alt="">
					<TransitionGroup className=''>
						<Fade key={this.state.currentId}>
							<img src={current} key={current}  />
						</Fade>	
					</TransitionGroup>
				</div>
				<div className="prev" onClick={this.subCurrent}/>
				<div className="next" onClick={this.addCurrent}/>
				<Footer images={images} currentId={this.state.currentId} setCurrent={this.setCurrent}/>
			</div>
		);
	}
}

export default Carousel;
