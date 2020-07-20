```

$ heroku domains --app food-oasis
=== food-oasis Heroku Domain
food-oasis.herokuapp.com

=== food-oasis Custom Domains
Domain Name  DNS Record Type DNS Target
foodoasis.la ALIAS or ANAME  ancient-durian-ihansyjz7m4f0l3rv93fqzfa.herokudns.com

darra@Lenovo MINGW64 /c/git/hackforla/food-oasis (develop)           heroku
$ heroku certs:auto:enable --app food-oasis
Enabling Automatic Certificate Management... starting. See status with 
heroku certs:auto or wait until active with heroku certs:auto:wait=== 
Your certificate will now be managed by Heroku.  Check the status 
by running heroku certs:auto.                                       

$ heroku certs:auto --app food-oasis
=== Automatic Certificate Management is enabled on food-oasis

Domain        Status   Reason                            Last Updated────────────  ───────  ────────────────────────────────  ────────────foodoasis.la  Failing  CDN not returning HTTP challenge  1 minute    

=== Some domains are failing validation, please verify that your DNS 
matches: heroku domains
    See our documentation at https://devcenter.heroku.com/articles/automated-certificate-management#failure-reasons
```

Modified the Cloudflare DNS records

```
$ heroku certs:auto --app food-oasis
=== Automatic Certificate Management is enabled on food-oasis        

Domain        Status   Reason                           Last Updated       
────────────  ───────  ───────────────────────────────  ────────────────── ─────                                                                inute 
foodoasis.la  Failing  Strict TLS in CDN not supported  less than a minute                                                                matche

=== Some domains are failing validation, please verify that your DNS tomate
matches: heroku domains
    See our documentation at https://devcenter.heroku.com/articles/automated-certificate-management#failure-reasons


$ curl -I www.foodoasis.la
HTTP/1.1 301 Moved Permanently
Date: Fri, 17 Jul 2020 17:25:32 GMT
Connection: keep-alive
Cache-Control: max-age=3600
Expires: Fri, 17 Jul 2020 18:25:32 GMT
Location: https://www.foodoasis.la/
cf-request-id: 03ff685f7f000004efa9273200000001
Server: cloudflare
CF-RAY: 5b45a9abfda504ef-LAX


darra@Lenovo MINGW64 /c/git/hackforla/food-oasis (develop)
$ curl -I foodoasis.la
HTTP/1.1 301 Moved Permanently
Date: Fri, 17 Jul 2020 17:26:30 GMT
Connection: keep-alive
Cache-Control: max-age=3600
Expires: Fri, 17 Jul 2020 18:26:30 GMT
Location: https://foodoasis.la/
cf-request-id: 03ff69454c00000568b4826200000001
Server: cloudflare
CF-RAY: 5b45ab1bac9a0568-LAX


darra@Lenovo MINGW64 /c/git/hackforla/food-oasis (develop)
$ heroku certs:auto --app food-oasis
=== Automatic Certificate Management is enabled on food-oasis

Domain        Status   Reason                           Last Updated
────────────  ───────  ───────────────────────────────  ────────────       
foodoasis.la  Failing  Strict TLS in CDN not supported  1 minute

=== Some domains are failing validation, please verify that your DNS matches: heroku domains
    See our documentation at https://devcenter.heroku.com/articles/automated-certificate-management#failure-reasons

darra@Lenovo MINGW64 /c/git/hackforla/food-oasis (develop)
$ heroku domains --app food-oasis
=== food-oasis Heroku Domain
food-oasis.herokuapp.com

=== food-oasis Custom Domains
Domain Name  DNS Record Type DNS Target

foodoasis.la ALIAS or ANAME  ancient-durian-ihansyjz7m4f0l3rv93fqzfa.herokudns.com
```


I think the following was because I had already added the domain from 
the Heroku UI:

```
$ heroku domains:add --app food-oasis foodoasis.la
Adding foodoasis.la to ⬢ food-oasis... done
 »   Error: Domain already added to this app.
 »
 »   Error ID: invalid_params

darra@Lenovo MINGW64 /c/git/hackforla/food-oasis (develop)

```