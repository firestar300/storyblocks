const path = require( 'path' );
const customConfig = require('../config/webpack.dev');

const stories = [
	'**/stories/*.js',
];

const customEnvVariables = {};

const modulesDir = path.join( __dirname, '../node_modules' );

// Workaround for Emotion 11
// https://github.com/storybookjs/storybook/pull/13300#issuecomment-783268111
const updateEmotionAliases = ( config ) => ( {
	...config,
	resolve: {
		...config.resolve,
		alias: {
			...config.resolve.alias,
			'@emotion/core': path.join( modulesDir, '@emotion/react' ),
			'@emotion/styled': path.join( modulesDir, '@emotion/styled' ),
			'@emotion/styled-base': path.join( modulesDir, '@emotion/styled' ),
			'emotion-theming': path.join( modulesDir, '@emotion/react' ),
		},
	},
} );

module.exports = {
	core: {
		builder: 'webpack5',
	},
	stories,
	addons: [
		{
			name: '@storybook/addon-docs',
			options: { configureJSX: true },
		},
		'@storybook/addon-controls',
		// '@storybook/addon-knobs', // deprecated, new stories should use addon-controls
		'@storybook/addon-storysource',
		'@storybook/addon-viewport',
		// '@storybook/addon-a11y',
		'@storybook/addon-toolbars',
	],
	managerWebpack: updateEmotionAliases,
	// Workaround:
	// https://github.com/storybookjs/storybook/issues/12270
	webpackFinal: async ( config ) => {
		// Find the DefinePlugin
		const plugin = config.plugins.find( ( p ) => {
			return p.definitions && p.definitions[ 'process.env' ];
		} );
		// Add custom env variables
		Object.keys( customEnvVariables ).forEach( ( key ) => {
			plugin.definitions[ 'process.env' ][ key ] = JSON.stringify(
				customEnvVariables[ key ]
			);
		} );


		return updateEmotionAliases({
			...config,
			module: {
				...config.module,
				rules: customConfig.module.rules
			},
			plugins: config.plugins.concat(customConfig.plugins)
		});
	},
};