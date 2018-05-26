import React, { Component } from 'react';
import { AutoComplete , Input, Icon} from 'antd';
import nba from 'nba';

const Option = AutoComplete.Option;

function onSelect(value) {
  console.log('onSelect', value);
}

export class SearchBar extends React.Component {
  state = {
    dataSource: [],
  }

  handleSearch = (value) => {

    this.setState({
      dataSource: !value ? [] : nba.searchPlayers(value).map(({playerId, fullName}) =>
        <Option key={playerId} value={fullName} id={playerId}>
          <img className="player-option-image" src={`http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerId}.png`} alt={`${playerId}`}/>
          <span className="player-option-label">{fullName}</span>
        </Option>
      )
    });
  }
  render() {
    window.nba = nba;
    const { dataSource } = this.state;
    return (
      <AutoComplete
        dataSource={dataSource}
        className="search-bar"
        onSelect={this.props.loadPlayerInfo}
        size="large"
        onSearch={this.handleSearch}
        placeholder="Search NBA player"
        optionLabelProp="value"
      >

          <Input suffix={<Icon type="search" className="certain-category-icon" />} />
      </AutoComplete>
    );
  }
}