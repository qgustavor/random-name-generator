var React = require('react');
var WordGeneratorStore = require('../stores/WordGeneratorStore');
var _ = require('lodash');


var WordGeneratorConfig = React.createClass({
	getInitialState: function () {
		return {
			config: WordGeneratorStore.getConfig(),
			isLoading: WordGeneratorStore.isLoading()
		};
	},
	_onWordGeneratorChange: function () {
		this.setState({
			config: WordGeneratorStore.getConfig()
		});
	},
	_onLoadChange: function () {
		this.setState({
			isLoading: WordGeneratorStore.isLoading()
		});
	},
	componentDidMount: function () {
		WordGeneratorStore.addWordGeneratorChangeListener(this._onWordGeneratorChange);
		WordGeneratorStore.addLoadChangeListener(this._onLoadChange);
	},
	componentWillUnmount: function () {
		WordGeneratorStore.removeWordGeneratorChangeListener(this._onWordGeneratorChange);
		WordGeneratorStore.removeLoadChangeListener(this._onLoadChange);
	},
	handleChangeSourceWordsUrl: function (e) {
		if (this.state.isLoading) {
			return;
		}
		var newConfig = _.assign({}, this.state.config, {sourceWordsUrl: e.target.value});
		this.setState({config: newConfig});
	},
	handleChangeWordStartsWith: function (e) {
		if (this.state.isLoading) {
			return;
		}
		var newConfig = _.assign({}, this.state.config, {wordStartsWith: e.target.value});
		this.setState({config: newConfig});
	},
	handleChangeChainOrder: function (e) {
		if (this.state.isLoading) {
			return;
		}
		var newConfig = _.assign({}, this.state.config, {chainOrder: parseInt(e.target.value)});
		this.setState({config: newConfig});
	},
	handleChangeMinWordLength: function (e) {
		if (this.state.isLoading) {
			return;
		}
		var newConfig = _.assign({}, this.state.config, {minWordLength: parseInt(e.target.value)});
		this.setState({config: newConfig});
	},
	handleChangeMaxWordLength: function (e) {
		if (this.state.isLoading) {
			return;
		}
		var newConfig = _.assign({}, this.state.config, {maxWordLength: parseInt(e.target.value)});
		this.setState({config: newConfig});
	},
	handleSubmit: function (e) {
		e.preventDefault();

		try {
			WordGeneratorStore.updateConfig(this.state.config);
		} catch (error) {
			console.warn(error);
			alert(error);
		}
	},
	render: function () {
		return (
			<div className="word-generator-config">
				<form className="form-inline" onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label>Source words:</label>
						<select className="form-control" value={this.state.config ? this.state.config.sourceWordsUrl : null} onChange={this.handleChangeSourceWordsUrl}>
							<option value="/wordlists/wordsEn.txt">English</option>
							<option value="/wordlists/wordsNl.txt">Dutch</option>
						</select>
					</div>

					<div className="form-group">
						<label>Word starts with:</label>
						<input type="text" className="form-control input-tiny" size="2" value={this.state.config ? this.state.config.wordStartsWith : null} onChange={this.handleChangeWordStartsWith} />
					</div>

					<div className="form-group">
						<label>Word randomness:</label>
						<select className="form-control" value={this.state.config ? this.state.config.chainOrder : null} onChange={this.handleChangeChainOrder}>
							<option value="1">1 (more random)</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4 (more like normal words)</option>
						</select>
					</div>

					<div className="form-group">
						<label>Word length:</label>

						<div className="input-group input-medium">
							<input type="number" className="form-control" min="1" max="50" value={this.state.config ? this.state.config.minWordLength : null} onChange={this.handleChangeMinWordLength} />

							<div className="input-group-addon">-</div>

							<input type="number" className="form-control" min="1" max="50" value={this.state.config ? this.state.config.maxWordLength : null} onChange={this.handleChangeMaxWordLength} />
						</div>
					</div>

					<div className="form-group">
						<button type="submit" className="btn btn-default">Update</button>
					</div>
				</form>
			</div>
		);
	}
});

module.exports = WordGeneratorConfig;