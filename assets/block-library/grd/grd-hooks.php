<?php 
	function aquamin_demo_hooks() {
		echo '<script>console.log("🤞", "Temporary grd hook for testing")</script>';
	}
	add_action( 'wp_footer', 'aquamin_demo_hooks');
?>
