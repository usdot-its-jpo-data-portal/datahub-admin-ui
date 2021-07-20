# datahub-admin-ui

DataHub Admin UI is the front end user interface to manage the meta-data used by the DataHub.

## Usage
Once the application is running on a configured the user interface should be accessible through the usage of a Web Browser application. 

---
## Autorization Token
The application requires an Authorization Token in order to execute any action. Contact the administrator to get a valid token.

The token must be placed in the text box in the header of the application identified by the paragraph *"Authorization token..."*

## File Manifest
* public: Contain the base code to be use during the publishing
* src : Contains the source code
* test : Contains the unit testing code.
* Dockerfile: Docker image definition file


## Development setup
> DataHub Admin UI was developed using [Vue JS](https://vuejs.org/) that is a [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) framework and [Visual Studio Code](https://code.visualstudio.com/) as main interface development environment. 

1. Install [Node JS](https://nodejs.org/en/)
2. Clone the repository from https://github.com/usdot-its-jpo-data-portal/datahub-admin-ui
3. Open the terminal on the directory there the project was clone and type:
```bash
>npm install
>npm install -g @vue/cli
```
4. Execute the application by the following command
```bash
>npm run serve
```
This last step will provide a link that by opening in a web browser will display the DataHub Admin User Interface.

## Docker Support
A [Docker](https://www.docker.com/) image can be build with the next command line.
```bash
  docker build -t datahub-admin-ui:latest .
```

The following command with the correct values for the environment variable will start a Docker container.
```bash
docker run --rm -d -p 8098:80 \
-e PROXY_PASS='proxy_pass "http://[HOST:PORT]/api";' \
-t -i datahub-admin-ui:latest
```

## Release History
* 1.0.0
  * Initial version
    * Listing Data Assets
    * Manage Projects
* 1.1.0
  * Data Types support
* 1.2.0
  * Engagement Popups support
* 1.3.0
  * SonarCloud Integration


## Contact information
Joe Doe : X@Y

Distributed under APACHE 2.0 license. See *LICENSE* for more information

## Contributing
1. Fork it (https://github.com/usdot-its-jpo-data-portal/datahub-admin-ui/fork)
2. Create your feature branch (git checkout -b feature/fooBar)
3. Commit your changes (git commit -am 'Add some fooBar')
4. Push to the branch (git push origin feature/fooBar)
5. Create a new Pull Request

## Known Bugs
*

## Credits and Acknowledgment
Thank you to the Department of Transportation for funding to develop this project.

## CODE.GOV Registration Info
* __Agency:__ DOT
* __Short Description:__ DataHub Admin UI to interface ITS DataHub Admin API.
* __Status:__ Beta
* __Tags:__ DataHub, DOT, Javascript, Vue JS
* __Labor Hours:__
* __Contact Name:__
* __Contact Phone:__

