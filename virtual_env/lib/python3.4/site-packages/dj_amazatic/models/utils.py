"""
utility function for models
"""

import time
import string
import random
from datetime import date


def generate_filename(instance, filename):  # pylint: disable=unused-argument
    """
    generate filename for image, format:
    year/month/day/unixtimestamp-randomchars-name
    """
    return "files/%s/%d-%s-%s" % (
        date.today().strftime("%Y/%m/%d"),
        int(time.time()),
        "".join([random.SystemRandom().choice(
            string.digits + string.ascii_letters) for x in range(6)]),
        filename
    )
