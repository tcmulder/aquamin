module.exports = {
	extends: ['plugin:@wordpress/eslint-plugin/recommended'],
	rules: {
		'no-console': 2,
		'prettier/prettier': [
			'error',
			{
				singleQuote: true,
				tabWidth: 4,
				useTabs: true,
			},
		],
		'import/no-extraneous-dependencies': [
			'error',
			{ devDependencies: true },
		],
		'import/no-unresolved': [2, { ignore: ['@wordpress', 'classnames'] }],
		'arrow-body-style': 'off',
		'no-undef': 'off',
		'react/prop-types': 'off',
	},
	overrides: [
		{
			files: ['*.html'],
			rules: {
				'prettier/prettier': [
					'error',
					{
						singleQuote: true,
						tabWidth: 2,
						useTabs: true,
					},
				],
			},
		},
	],
};
