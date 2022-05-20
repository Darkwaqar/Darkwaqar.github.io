import React, { Component } from 'react';
import styled from 'styled-components';
import vhCheck from 'vh-check';
import TextContent from './TextContent';
import ImageContent from './ImageContent';

const Container = styled.div`
    display: flex;
    flex-flow: row nowrap;
    /* border: 1px dashed red; */
`;

class Work extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vh: 0,
      slideNumber: 0,
    };
    this.pageSplitTimes = 1.3;
    this.lastScrollTop = 0;
    this.scrollDirectionDown = true;
    this.handleScroll = this.handleScroll.bind(this);
    this.workDetails = [
      {
        number: '',
        projectName: '',
        projectDesc: '',
        projectType: '',
        roles: [''],
      },
      {
        number: '01',
        projectName: 'FOOTPRINT',
        projectDesc: 'Project to customize Shoes with User Selectable Theme, Localization and State management Single Backend to handle all the three applications.',
        projectType: 'iOS APP ,Android APP, Website',
        roles: ['Full Stack Developer', 'UI Designer'],
      },
      {
        number: '02',
        projectName: 'Sadaf Amir',
        projectDesc: 'E-Commerce project with essential features. Multiple Gateway Integration i-e VISA , EASYPAY and Paypal ',
        projectType: 'iOS APP, Android APP, Website',
        roles: ['Front-end Developer', 'UI Designer'],
      },
      {
        number: '03',
        projectName: 'Insider - Business News & More',
        projectDesc: 'The Insider app provides you with a fast and convenient way to read business news on the go.',
        projectType: 'iOS APP, Android APP and Web APP',
        roles: ['Front-end Developer', 'UI Designer'],
      },
      {
        number: '04',
        projectName: 'Sania Maskatiya',
        projectDesc: 'Android Application with Dynamic Layout Customizable from backend fully Functional Luxury E-commerce Application.',
        projectType: 'Android APP',
        roles: ['Mobile App Developer ,UI Designer'],
      },
      {
        number: '05',
        projectName: 'Business Recorder',
        projectDesc: 'Business Recorder is the biggest financial daily Pakistan and the first such publication to be published in the Muslim World. ',
        projectType: 'iOS APP, Android and Web APP',
        roles: ['Full Stack Developer', 'UI Designer'],
      },
      {
        number: '06',
        projectName: 'Grandeur',
        projectDesc: '3D Website with custom intractable animation and object, Buy and customization of men accessories Available in multiple currency and Languages',
        projectType: 'WEB APP',
        roles: ['Full Stack Developer', 'UI Designer'],
      },
      {
        number: '',
        projectName: '',
        projectDesc: '',
        projectType: '',
        roles: [''],
      },
    ];
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    const vhDiff = vhCheck().offset;
    this.setState(
      {
        vh: Math.round(
          (window.document.documentElement.clientHeight + vhDiff) * this.pageSplitTimes,
        ),
      },
    );
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    const { body, documentElement } = event.srcElement;
    const { vh, slideNumber } = this.state;
    const scrollDistance = Math.max(body.scrollTop, documentElement.scrollTop);
    if (scrollDistance > this.lastScrollTop) {
      this.scrollDirectionDown = true;
    } else {
      this.scrollDirectionDown = false;
    }
    this.lastScrollTop = scrollDistance;
    // console.log(scrollDistance);

    if (Math.floor(scrollDistance / vh) !== slideNumber
      && slideNumber < this.workDetails.length - 1) {
      this.setState({ slideNumber: Math.floor(scrollDistance / vh) });
    } else if (slideNumber === this.workDetails.length - 1
      && (Math.floor(scrollDistance / vh) < slideNumber)) {
      this.setState({ slideNumber: Math.floor(scrollDistance / vh) });
    }
  }

  changeTextContentBasedOnScroll() {
    const { slideNumber } = this.state;
    const refresh = true;
    return (
      <TextContent
        number={this.workDetails[slideNumber].number}
        projectName={this.workDetails[slideNumber].projectName}
        projectDesc={this.workDetails[slideNumber].projectDesc}
        projectType={this.workDetails[slideNumber].projectType}
        roles={this.workDetails[slideNumber].roles}
        refreshToggle={refresh}
      />
    );
  }

  render() {
    return (
      <Container>
        {this.changeTextContentBasedOnScroll()}
        <ImageContent pageSplitTimes={this.pageSplitTimes} />
      </Container>
    );
  }
}

export default Work;
