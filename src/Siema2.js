import React from 'react';

class Siema extends React.Component {
  constructor(props) {
    super(props);

    // DOM ref
    this.container = null;
    this.slideFrame = null;

    // Internal info
    this.currentIndex = 0;
    this.containerWidth = null;
    this.visibleChildren = null;
    this.isMoving = false;

    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
    this.updateVisibleChildren = this.updateVisibleChildren.bind(this);
  }

  componentDidMount() {
    // set up width of container
    this.containerWidth = this.container.getBoundingClientRect().width;
    // set up width of the slideFrame
    this.slideFrame.style.width = `${this.containerWidth * 3}px`;
    // set up initial children
    this.updateVisibleChildren();
  }

  handlePrev() {
    if (this.currentIndex === 0) return;
    if (this.isMoving) return;
    this.isMoving = true;

    // update current index
    this.currentIndex = this.currentIndex - 1;

    // update the transform-styling of slideFrame
    const newTranslate = 0;
    this.slideFrame.style.transform = `translateX(-${newTranslate}px)`
    // add transition to styling of slideFrame
    this.slideFrame.style.transition = 'all 200ms ease-in-out';
    // add event listener on transition end
    this.slideFrame.addEventListener('transitionend', this.handleTransitionEnd);
  }

  handleNext() {
    if (this.currentIndex === this.props.children.length - 1) return;
    if (this.isMoving) return;
    this.isMoving = true;

    // update current index
    this.currentIndex = this.currentIndex + 1;

    // update the transform-styling of slideFrame
    let newTranslate;
    if (this.currentIndex === 0) {
      newTranslate = 0;
    } else if (this.currentIndex === 1) {
      newTranslate = this.containerWidth;
    } else {
      newTranslate = this.containerWidth * 2;
    }
    this.slideFrame.style.transform = `translateX(-${newTranslate}px)`;

    // add transition to styling of slideFrame
    this.slideFrame.style.transition = 'all 200ms ease-in-out';
    // add event listener on transition end
    this.slideFrame.addEventListener('transitionend', this.handleTransitionEnd);
  }

  handleTransitionEnd() {
    this.isMoving = false;
    // update the transform-styling of the slideFrame
    let newTranslate;
    if (this.currentIndex === 0) {
      newTranslate = 0;
    } else {
      newTranslate = this.containerWidth;
    }
    this.slideFrame.style.transform = `translateX(-${newTranslate}px)`;
    // remove transition
    this.slideFrame.style.transition = 'none';
    // remove event listener
    this.slideFrame.removeEventListener('transitionend', this.handleTransitionEnd);

    // update the children that are displayed
    this.updateVisibleChildren();
  }

  updateVisibleChildren() {
    // display the previous, current, and next child
    const myChildren = React.Children.map(this.props.children, (child, index) => {
      if (Math.abs(this.currentIndex - index) <= 1) {
        return React.cloneElement(child, {
          key: index,
          style: {
            float: 'left',
            width: `${100 / 3}%`,
            textAlign: 'center',
          },
        });
      }
      return null;
    });
    this.visibleChildren = myChildren;
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <div
          ref={(container) => this.container = container}
          style={{ overflow: 'hidden' }}
        >
          <div ref={(slideFrame) => this.slideFrame = slideFrame}>
            {this.visibleChildren}
          </div>
        </div>
        <div style={{ clear: 'both' }}>
          <button onClick={this.handlePrev}>Previous</button>
          <button onClick={this.handleNext}>Next</button>
        </div>
      </div>
    );
  }
}

export default Siema;
