#!/bin/bash

rm -rf appointment/migrations/0* appointment/migrations/__py* appointment/__py* appointment/*.pyc appointment/migrations/*.pyc

rm -rf user/migrations/0* user/migrations/__py* user/__py* user/*.pyc user/migrations/*.pyc

rm -rf timeslot/migrations/0* timeslot/migrations/__py* timeslot/__py* timeslot/*.pyc timeslot/migrations/*.pyc

rm -rf service/migrations/0* service/migrations/__py* service/__py* service/*.pyc service/migrations/*.pyc

rm -rf organisation/migrations/0* organisation/migrations/__py* organisation/__py* organisation/*.pyc organisation/migrations/*.pyc

rm -rf core/__pycache__/ core/*.pyc

rm -rf core/settings/__pycache__/ core/settings/*.pyc