import React from 'react';
import axios from 'axios';
import ConcertEntry from './ConcertEntry.jsx';
import {ListGroup} from 'react-bootstrap';
import {Panel, Tabs, Tab} from 'react-bootstrap';
import { connect } from 'react-redux';
import ReactScrollbar from 'react-scrollbar-js';

const Concerts = (props) => {
  const scroll = {
    width: '100%',
    height: '400',
    speed: '10'
  }
 const scrollTo = (pos) => {
    return () => {
      this.scroll.scrollToY(pos);
      };
    }
  const nearby = (
    <ReactScrollbar ref={(c) => { console.log(this.scroll); } style={scroll}>
      <Panel collapsible defaultExpanded header={`Nearby Concerts`}>
        <ListGroup fill>
          {props.events.map((event, i) => {
            return <ConcertEntry event={event} key={i} handleArtistClick={props.handleArtistClick} />
          })}
        </ListGroup>
      </Panel>
    </ReactScrollbar>
  )
  const popularityObj = (events) => {
    props.events.sort((a, b) => {
      if (a.popularity > b.popularity) {
        return 1;
      }
      if (a.popularity < b.popularity) {
        return -1;
      }
      return 0;
    }).reverse();
  }

  const popular = (
    <ReactScrollbar style={scroll}>
      <Panel collapsible defaultExpanded header={`Popular Concerts`}>
        <ListGroup fill>
          {popularityObj(props.events)}
          {props.events.map((event, i) => {
            return <ConcertEntry event={event} key={i} handleArtistClick={props.handleArtistClick} />
          })}
        </ListGroup>
      </Panel>
    </ReactScrollbar>
  )

  return (
    <div>
      <Tabs defaultActiveKey={1}>
        <Tab eventKey={1} title='Nearby'>{nearby}</Tab>
        <Tab eventKey={2} title='Popular'>{popular}</Tab>
        <button>SCROLL ME</button>
      </Tabs>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    'events': state.events
  }
}

export const UnwrappedConcerts = Concerts;
export default connect(mapStateToProps)(Concerts);
