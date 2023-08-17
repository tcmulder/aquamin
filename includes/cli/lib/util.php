<?php
/**
 * Aquamin WP-CLI utilities.
 * 
 * @package AquaminCLI
 */

namespace AquaminCLI\Util;

use WP_CLI;
use RecursiveIteratorIterator;
use RecursiveDirectoryIterator;

defined( 'ABSPATH' ) || exit; // exit if accessed directly

/**
 * Asks a question and return result.
 *
 * @param   string  $question  Question to ask the user.
 * @param   string  $guess     Optional guess at the user's answer.
 * @param   string  $default   Optional default (i.e. passed as cli arguments)
 * @return  string/bool        Returns answer as string, or boolean if "y" or "n".
 */
function ask( $question, $guess='', $default=null ) {
	$answer = null;
	// if user explicitly passed a boolean as a cli option then default to "y"
	if ( 'boolean' === gettype( $default ) ) {
		$answer = 'y';
	// if user explicitly passed a string as a cli option then use it
	} elseif ( $default ) {
		$answer = $default;
	// if the user hasn't defined something via a cli option then ask for input
	} else {
		fwrite( STDOUT, $question . ' ' );
		$input = trim( fgets( STDIN ) );
		// go with their answer or our guess if they didn't answer
		$input = $input ? $input : $guess;
		$answer = $input;
	}
	// sanitize user input
	$answer = esc_html( $answer );
	// handle "y" and "n" boolean answers (assumes guess is either "n" or "y")
	if ( 'n' === $guess || 'y' === $guess ) {
		$answer = strtolower( $answer ) === 'y' ? true : false;
	}
	debug( "Question: \"$question\"", " Answer: \"", $answer, "\"" );
	return $answer;
}

/**
 * Find-and-replace text in files
 * 
 * @param   array  $files  File paths.
 * @param   array  $far    Array like ['find' => 'look for', 'repl' => 'replace with].
 * @return  null
 */
function far( $path, $far ) {
	$files = new RecursiveIteratorIterator( new RecursiveDirectoryIterator( $path ) );
	if ( ! empty( $files ) && ! empty( $far ) ) {
		foreach( $files as $file ) {
			if ( is_file( $file ) ) {
				$str = file_get_contents( $file );
				foreach ( $far as $arr ) {
					$str = str_replace( $arr[ 'find' ], $arr[ 'repl' ], $str );
					debug( 'Replacing ', $arr[ 'find' ], ' with ', $arr[ 'repl' ], ' in ', $file->getBasename() );
				}
				file_put_contents( $file, $str );
			}
		}
	}
}

/**
 * Build find-and-replace array.
 * 
 * @param   array   $far   Array of find-and-replace values (passed by reference).
 * @param   array   $args  Arguments like ['question', 'guess', 'find', 'default'].
 * @return  string         Value of the answer to the question.
 */
function build_far( &$far, $args ) {
	$question = str_replace( '[guess]', '[' . $args['guess'] . ']', $args['question'] );
	$repl = ask( $question, $args['guess'], $args['default'] );
	array_push( $far, array( 'find' => $args['find'], 'repl' => $repl ) );
	debug( 'Will replace ', $args['find'], ' with ', $repl );
	return $repl;
}

/**
 * Build excluded files list.
 * 
 * @param   array   $exclude  Array of files to exclude/delete (passed by reference).
 * @param   array   $args     Arguments like ['question', 'guess', 'filename', 'default'].
 * @return  bool              True if excluding, false if including.
 */
function exclude( &$exclude, $args ) {
	$question = str_replace( '[guess]', '[' . $args['guess'] . ']', $args['question'] );
	$dont_exclude = ask( $question, $args['guess'], $args['default'] );
	if ( ! $dont_exclude  ) {
		array_push( $exclude, $args['filename'] );
		debug( 'Will exclude ', $args['filename'] );
	} else {
		debug( 'Will include ', $args['filename'] );
	}
	return $dont_exclude;
}

/**
 * Add prefix to filenames
 * 
 * @param   string  $path  Path to files we're renaming.
 * @param   string  $find  String to find.
 * @param   string  $repl  Replacement string.
 * @return  null
 */
function prefix( $path, $find, $repl ) {
	foreach( new RecursiveIteratorIterator( new RecursiveDirectoryIterator( $path ) ) as $file ) {
		if ( is_file( $file ) ) {
			$file_name = basename( $file );
			if ( str_starts_with( $file_name, $find ) ) {
				$new_file = str_replace( $find, $repl, $file );
				debug( 'Renaming ', $file_name, ' to ', basename( $new_file ), ' in ', dirname( $file ) );
				rename( $file, $new_file );
			}
		}
	}
}

/**
 * Output debug info
 * 
 * Run wp-cli with flag --debug to
 * enable debugging messages. Enter
 * as many mixed arguments as you'd
 * like to output.
 * 
 * @return null
 */
function debug() {
	$msg = '';
	$args = func_get_args();
	foreach( $args as $info ) {
		$type = gettype( $info );
		if ( 'array' === $type || 'object' === $type ) {
			$msg .= "\n";
		}
		$msg .= print_r( $info, 1 );
	}
	WP_CLI::debug( $msg, 'aquamin' );
}
