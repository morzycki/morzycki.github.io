/* Sophus3 logging request. http://www.sophus3.com
 * Times Site identifier code for eDataXchange
 * Copyright (c) Sophus3 Ltd 2001-2007. All rights reserved. Patent Pending.
 * Change the value of tc_logging_active to switch off logging on the site. */

if (typeof tc_logging_active == 'undefined') tc_logging_active = true;

tc_site_id = 6;
tc_server_url = "nma.sophus3.com";
tc_log_path = "/sophus3";
document.write("<scr"+"ipt language='JavaScript' type='text/javascript' src='"+tc_log_path+"/logging-code.js'></scr"+"ipt>");