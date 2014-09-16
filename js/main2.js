/**
 * main2.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
(function() {

	/**
	 * based on from https://github.com/inuyaksa/jquery.nicescroll/blob/master/jquery.nicescroll.js
	 */
	function hasParent( e, p ) {
		if (!e) return false;
		var el = e.target||e.srcElement||e||false;
		while (el && el != p) {
			el = el.parentNode||false;
		}
		return (el!==false);
	};

	var bodyEl = document.body,
		openbtn = document.getElementById( 'open-button' ),
		closebtn = document.getElementById( 'close-button' ),
		closebtnsub = document.getElementById( 'close-button-sub' ),
		caldays = [].slice.call( document.getElementById( 'calendar' ).querySelectorAll( '.fc-body > div.fc-row > div' ) ),
		menu = document.querySelector( '.menu-wrap[data-level="1"]' ),
		submenu = document.querySelector( '.menu-wrap[data-level="2"]' ),
		isMenuOpen = false, isSubMenuOpen = false;

	function init() {
		initEvents();
	}

	function initEvents() {
		openbtn.addEventListener( 'click', toggleMenu );
		
		if( closebtn ) {
			closebtn.addEventListener( 'click', toggleMenu );
		}

		caldays.forEach( function( cell ) {
			if( cell.hasChildNodes() ) {
				cell.addEventListener( 'click', toggleSubMenu );
			}
		} );

		if( closebtnsub ) {
			closebtnsub.addEventListener( 'click', toggleSubMenu );
		}

		// close the menu element if the target it´s not the menu element or one of its descendants..
		document.addEventListener( 'mousedown', function(ev) {
			var target = ev.target;
			
			if( isSubMenuOpen ) {
				if( target !== submenu && target !== closebtnsub && !hasParent( target, submenu ) ) {
					closeMenus();
				}
			}
			else if( isMenuOpen ) {
				if( target !== menu && target !== closebtn && !hasParent( target, menu ) ) {
					closeMenus();
				}
			}
		} );
	}

	function toggleMenu() {
		if( isMenuOpen ) {
			classie.remove( bodyEl, 'show-menu' );
		}
		else {
			classie.add( bodyEl, 'show-menu' );
		}
		isMenuOpen = !isMenuOpen;
	}

	function toggleSubMenu() {
		if( isSubMenuOpen ) {
			classie.remove( bodyEl, 'show-submenu' );
		}
		else {
			classie.add( bodyEl, 'show-submenu' );
		}
		isSubMenuOpen = !isSubMenuOpen;
	}

	function closeMenus() {
		if( isSubMenuOpen ) {
			toggleSubMenu();
		}
		if( isMenuOpen ) {
			toggleMenu();
		}
	}

	init();

})();