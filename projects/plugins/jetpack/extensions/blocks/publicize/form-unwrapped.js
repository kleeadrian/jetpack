/**
 * Publicize sharing form component.
 *
 * Displays text area and connection list to allow user
 * to select connections to share to and write a custom
 * sharing message.
 */

/**
 * External dependencies
 */
import classnames from 'classnames';
import { __, _n, sprintf } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { uniqueId } from 'lodash';

/**
 * Internal dependencies
 */
import PublicizeConnection from './connection';
import PublicizeSettingsButton from './settings-button';

class PublicizeFormUnwrapped extends Component {
	state = {
		hasEditedShareMessage: false,
	};

	fieldId = uniqueId( 'jetpack-publicize-message-field-' );

	/**
	 * Check to see if form should be disabled.
	 *
	 * Checks full connection list to determine if all are disabled.
	 * If they all are, it returns true to disable whole form.
	 *
	 * @return {boolean} True if whole form should be disabled.
	 */
	isDisabled() {
		return this.props.connections.every( connection => ! connection.toggleable );
	}

	onMessageChange = event => {
		const { messageChange } = this.props;
		this.setState( { hasEditedShareMessage: true } );
		messageChange( event );
	};

	render() {
		const { connections, toggleConnection, refreshCallback, shareMessage, maxLength } = this.props;
		const charactersRemaining = maxLength - shareMessage.length;
		const characterCountClass = classnames( 'jetpack-publicize-character-count', {
			'wpas-twitter-length-limit': charactersRemaining <= 0,
		} );

		return (
			<div id="publicize-form">
				<ul className="jetpack-publicize__connections-list">
					{ connections.map( ( { display_name, enabled, id, service_name, toggleable } ) => (
						<PublicizeConnection
							disabled={ ! toggleable }
							enabled={ enabled }
							key={ id }
							id={ id }
							label={ display_name }
							name={ service_name }
							toggleConnection={ toggleConnection }
						/>
					) ) }
				</ul>
				<PublicizeSettingsButton refreshCallback={ refreshCallback } />
				{ connections.some( connection => connection.enabled ) && (
					<Fragment>
						<label className="jetpack-publicize-message-note" htmlFor={ this.fieldId }>
							{ __( 'Customize your message', 'jetpack' ) }
						</label>
						<div className="jetpack-publicize-message-box">
							<textarea
								id={ this.fieldId }
								value={ shareMessage }
								onChange={ this.onMessageChange }
								disabled={ this.isDisabled() }
								maxLength={ maxLength }
								placeholder={ __(
									"Write a message for your audience here. If you leave this blank, we'll use an excerpt of the post content as the message.",
									'jetpack'
								) }
								rows={ 4 }
							/>
							<div className={ characterCountClass }>
								{ sprintf(
									/* translators: placeholder is a number. */
									_n(
										'%d character remaining',
										'%d characters remaining',
										charactersRemaining,
										'jetpack'
									),
									charactersRemaining
								) }
							</div>
						</div>
					</Fragment>
				) }
			</div>
		);
	}
}

export default PublicizeFormUnwrapped;
