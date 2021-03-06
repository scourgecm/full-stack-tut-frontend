import React from "react";

class Vote extends React.PureComponent {
    render() {
        return (
            <div className="vote">
                {this.getPair().map(entry =>
                    <button key={entry}
                        onClick={() => this.props.vote(entry)}
                        disabled={this.isDisabled()}>
                        <h1>{entry}</h1>
                        {this.hasVotedFor(entry) ?
                            <div className="label">Voted</div> :
                            null}
                    </button>
                )}
            </div>
        )
    }

    isDisabled() {
        return !!this.props.hasVoted;
    }

    hasVotedFor(entry) {
        return this.props.hasVoted === entry;
    }

    getPair() {
        return this.props.pair || [];
    }
}

export default Vote;