# SIRP Installation

SIRP is deployed based on the Nocoly platform. Nocoly can be deployed privately or used as a cloud service.

## Nocoly Private Deployment VS Cloud Service

- **Nocoly Cloud Service**: Suitable for quick experience and small-scale verification.
    - No need to maintain servers and environment yourself.
    - Data is stored in the Nocoly cloud.
    - The free version has functional limitations.

- **Nocoly Private Deployment**: Suitable for production environment deployment and large-scale testing.
    - Minimum configuration requirements: 8 core CPU, 32GB RAM, 50GB disk space.
    - Data is stored on local servers.
    - Private deployment allows free use of professional version features.

For a detailed comparison, please refer to: https://www.nocoly.com/pricing

## Install Nocoly (Private Deployment)

Refer to the [Official Installation Manual](https://docs-pd.nocoly.com/zh-Hans/deployment/docker-compose/standalone/quickstart/)

### Common Issues

- `DockerCgroupDrive` issue

  https://docs-pd.nocoly.com/deployment/env/?_highlight=dockercgroupdrive#dockercgroupdrive

- `ERROR: client version 1.25 is too old. Minimum supported API version is 1.44, please upgrade your client to a newer version` error

  Modify the `service.sh` script to change all `XXX\docker-compose` to `docker compose` (use the system's docker compose to start).

## Register Nocoly Account (Cloud Service)

Visit the Nocoly official website and register: https://www.nocoly.com/

## Download SIRP Application

- Clone the ASP codebase

```bash
git clone git@github.com:FunnyWolf/agentic-soc-platform.git
```

- The SIRP application file is `agentic-soc-platform/Docker/SIRP/SIRP.mdy`.

## Install SIRP Application (Cloud Service)

> Free version does not support application upgrades

- Log in to the Nocoly platform, select `Applications` -> `New Application` -> `Import`, and choose the `SIRP.mdy` file to import.

![img.png](img.png)

![img_1.png](img_1.png)

## Import SIRP Application (Private Deployment)

> Private deployment professional version is free and supports application upgrades

- Log in to the Nocoly private deployment address, select `Organization Management` -> `Applications`, and choose the `SIRP.mdy` file to import.

![img_4.png](img_4.png)

![img_5.png](img_5.png)

![img_6.png](img_6.png)

- Supports application upgrades

![img_7.png](img_7.png)

![img_8.png](img_8.png)

![img_9.png](img_9.png)

## Open SIRP Application

- After importing, click `SIRP` to open the application.

![img_2.png](img_2.png)

![img_3.png](img_3.png)
