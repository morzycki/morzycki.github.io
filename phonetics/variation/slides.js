/*

   doodads for slides
   ==================

   Shows and hides them and corresponding links. This uses cookies to keep
   track of which abstracts are visible, which I guess is kind of lame, but
   otherwise things keep reappearing when you press the back button.
   ---MJM-9-Mar-10

*/

var BIB_CLASS_NAME        = 'bib';
   // Only used to make sure items don't wind up named after the BibTeX link.
var COOKIE_NAME           = 'hidden_abstracts_not_creepy';
   // Name for the field in the cookie that keeps track of what's hidden.
var EXPIRE_AFTER          = 1;
   // Expiration date of cookie in days.
var ABSTRACT_CLASS        = 'abs';
var ITEM_ID_PREFIX        = 'item_';

// abstract show/hide link stuff: 
var USE_HIDE_LINKS        = true;
   // Should there be hide links at the ends of abstracts?
var USE_SHOW_HIDE_TOGGLES = false;
   // Should the main abstract link be used for both showing and hiding?
var LINK_CONTENT          = 'abstract';
   // The displayed content of show-a-particular-abstract link.
var HIDE_LINK_CONTENT     = 'hide abstract';
var LINK_CLASS            = 'abs_link';
var LINK_ID_PREFIX        = 'abs_link_';
var HIDE_LINK_ID_PREFIX   = 'abs_hide_link_';
var LINK_MOUSEOVER        = ''; //'Click to display the abstract.';
   // The mouseover-text/title/alt-text thing for abstract links.

// ids of the show-all-abstracts phrase, its hide-all counterpart, and an
// optional 'hide all or show all' counterpart (they should all start out
// hidden in the source itself, because they should be revealed only if JS is
// loaded):
var SHOW_ALL_ABS_LINK_ID  = 'show_abs_link';
var HIDE_ALL_ABS_LINK_ID  = 'hide_abs_link';
var BOTH_ALL_ABS_LINK_ID  = 'show_hide_abs_link';

var abstract_values = [];
   // For each item, true iff abstract is visible.
var no_of_abstracts = 0;
   // Ludicrously, there is no good way in JS to get the length of a hash, and 
   // we don't want to have to count things with a for loop each time, so 
   // tracking it with a separate variable. Blech!
var all_link        = [];
   // Show/hide-all links (including any for both).

function initialize_abstracts() {

   var item_links, pars, new_link;
   var lis = document.getElementsByTagName("li");

   for ( var i in lis ) {

      // assign an id to an item:
      if ( lis[i].id != '' ) lis[i].id += "_" + i;
         // If it already has one, just add a numerical suffix.
      else {

         // generate an id from the id of the first link or from its content:
         try {
            item_links = lis[i].getElementsByTagName("a");
            if ( item_links[0].id != '' ) 
               lis[i].id = ITEM_ID_PREFIX + i + "_" + item_links[0].id;
            else if ( item_links[0].className == BIB_CLASS_NAME ) 
               throw("BibTeX tag");
            else 
               lis[i].id = 
                  ITEM_ID_PREFIX + i + "_" +  
                  item_links[0].innerHTML.match(/\w+/g).join('_');
         }
         
         // if there aren't any links in this item, just use the id prefix:
         catch ( err ) { lis[i].id = ITEM_ID_PREFIX + i; }

      }

      // create a show/hide abstract link:
      try {
         pars = lis[i].getElementsByTagName('p');
            // This will fail if there are no <p>s in this item. Hence the 
            // try.
         for ( var j in pars ) if ( pars[j].className == ABSTRACT_CLASS ) {
            // Loops through abstract pars (though we'll bail if we find one).

            // create main abstract link:
            new_link = ' <a ' + 
               'class="'  + LINK_CLASS                 + '" ' + 
               'id="'     + LINK_ID_PREFIX + lis[i].id + '" ';
            if ( LINK_MOUSEOVER != "" ) new_link += 
               'title="'  + LINK_MOUSEOVER             + '" ';
            new_link += 
               'href=""' + '>' + LINK_CONTENT + '</a>';
            pars[0].innerHTML += new_link;
            
            // hook up javascript to link:
            document.getElementById(LINK_ID_PREFIX + 
               lis[i].id).onclick = run_abs_link;
               // People seem to think it's good practice to do things this
               // way rather than by putting 'javascript:' in the href field,
               // but doing things that way actually yields informative status
               // lines, whereas this way, they're actually misleading... Eh.

            // make a hide link on the basis of the main link if necessary:
            if ( USE_HIDE_LINKS ) {
               pars[pars.length - 1].innerHTML += new_link.
                  replace(
                     LINK_ID_PREFIX      + lis[i].id, 
                     HIDE_LINK_ID_PREFIX + lis[i].id
                  ).
                  replace(LINK_CONTENT, HIDE_LINK_CONTENT)
               document.getElementById(HIDE_LINK_ID_PREFIX + 
                  lis[i].id).onclick = run_abs_link;
            }

            // save the link info:
            abstract_values[lis[i].id] = true;
            no_of_abstracts++;
            
            // if there are other pars in this item, we don't care because we 
            // already created a link, so skip them:
            break;
            
         }
      }
      finally { continue };
      
   }

   try {
      
      // set the show/hide links:
      all_link["show"]    = document.getElementById(SHOW_ALL_ABS_LINK_ID);
      all_link["hide"]    = document.getElementById(HIDE_ALL_ABS_LINK_ID);
      if ( document.getElementById(BOTH_ALL_ABS_LINK_ID) != null )
         all_link["both"] = document.getElementById(BOTH_ALL_ABS_LINK_ID);
      else
         all_link["both"] = all_link["show"];

      match_the_cookie();
   
   } catch ( err ) {}
   
}

// generic reveal/conceal:
function reveal( the_element ) {
   if ( the_element.className == ABSTRACT_CLASS ) 
      the_element.style.display = 'block';
   else
      the_element.style.display = 'inline';
}
function conceal( the_element ) { the_element.style.display = 'none'; }
function affect( the_element, the_effect ) {
   if ( the_effect ) reveal(the_element); else conceal(the_element);
}

// what fires when a show/hide link for a particular abstract is clicked: 
function run_abs_link() {
   affect_abstract(
      this.id.replace(LINK_ID_PREFIX, '').replace(HIDE_LINK_ID_PREFIX, ''),
            // This all sorts out the id of the abstract itself.
      this.innerHTML == LINK_CONTENT
   ); 
   update_cookie_and_links();
      // NB: Shouldn't put this in affect_abstract() because for speed reasons
      //     we don't want it happening independently for each item when
      //     affecting lots of them simultaneously.
   return false;
      // It's necessary to return false to prevent the href in the link from
      // being followed.
}

// for hiding or showing a particular abstract:
function affect_abstract( the_id, the_effect ) {
   
   // switch every <p> in this item:
   var pars = document.getElementById(the_id).getElementsByTagName('p');
   for ( var i in pars ) 
      if ( pars[i].className == ABSTRACT_CLASS ) affect(pars[i], the_effect);
   
   // toggle either content of main link (if using it as a toggle) or else its
   // visibility:
   if ( USE_SHOW_HIDE_TOGGLES )
      document.getElementById(LINK_ID_PREFIX + the_id).innerHTML = 
         the_effect ? HIDE_LINK_CONTENT : LINK_CONTENT;
   else
      affect(document.getElementById(LINK_ID_PREFIX + the_id),
         ! the_effect);
         
   // if using hide link, its visibility needs to be toggled too: 
   if ( USE_HIDE_LINKS )
      affect(document.getElementById(HIDE_LINK_ID_PREFIX + the_id),
         the_effect);
   
   // store the value:
   abstract_values[the_id] = the_effect;

}
function update_cookie_and_links() {
      // NB: Best to do this separately from the hiding/showing because when 
      //     doing a bunch at once, as when reading the cookie or affecting 
      //     all, it slows things down to write each move to the cookie 
      //     individually.
   
   // determine currently hidden abstracts and store them in a cookie:
   var hidden_abstracts = [];
   for ( var i in abstract_values )
      if ( abstract_values[i] == false ) hidden_abstracts.push(i);
   update_cookie(hidden_abstracts);
   
   // update the show/hide all links in light of above info:
   if ( hidden_abstracts.length == 0 )
      display_all_abs_link("hide");
   else if ( hidden_abstracts.length == no_of_abstracts ) 
      display_all_abs_link("show");
   else 
      display_all_abs_link("both");
}

// for hiding or showing all abstracts:
function hide_abstracts() { affect_abstracts(false); }
function show_abstracts() { affect_abstracts(true);  }
function affect_abstracts( the_effect ) {
   for ( var i in abstract_values ) affect_abstract(i, the_effect);
   update_cookie_and_links();
}
var current_display_all_state; 
function display_all_abs_link( which_link ) {
   if ( which_link == current_display_all_state ) return true;
   for ( var i in all_link ) conceal(all_link[i]);
   reveal(all_link[which_link]);
   current_display_all_state = which_link;
}

// cookies for tracking what's hidden:
var COOKIE_DELIM = ", ";
function update_cookie( hidden_items ) {
   var hidden_items_str = hidden_items.join(COOKIE_DELIM) + COOKIE_DELIM;
   setCookie(COOKIE_NAME, hidden_items_str, EXPIRE_AFTER);
}
function match_the_cookie() {
   var hidden_items_str = getCookie(COOKIE_NAME);
   for ( var i in abstract_values )
      affect_abstract(i, ! hidden_items_str.match(i + COOKIE_DELIM));
   update_cookie_and_links();
}


/*****************************************************************************
The stuff stuff below is from http://www.w3schools.com.
*****************************************************************************/

function setCookie(c_name,value,expiredays)
{
   var exdate=new Date();
   exdate.setDate(exdate.getDate()+expiredays);
   document.cookie=c_name+ "=" +escape(value)+
   ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

function getCookie(c_name)
{
   if (document.cookie.length>0)
      {
      c_start=document.cookie.indexOf(c_name + "=");
      if (c_start!=-1)
         {
         c_start=c_start + c_name.length+1;
         c_end=document.cookie.indexOf(";",c_start);
         if (c_end==-1) c_end=document.cookie.length;
         return unescape(document.cookie.substring(c_start,c_end));
         }
      }
   return "";
}

/****************************************************************************/


initialize_abstracts();
   // This has to be final, because it won't work unless the show/hide-all 
   // abstract links are already present, which they wouldn't have been if the 
   // script is run from the header. (It also has to be after practically all 
   // the functions above have already been defined, which is why it is at the 
   // end of this file.) An alternative set-up is not to initialize things
   // now, and to load the script in the header but initialize it separately
   // by calling this function at the end of the page. Either way, this should
   // definitely NOT be called using onLoad, since we don't want everything to
   // be visible until the page (including all images and stat counter stuff)
   // finishes loading.
