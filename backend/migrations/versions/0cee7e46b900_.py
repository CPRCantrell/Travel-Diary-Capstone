"""empty message

Revision ID: 0cee7e46b900
Revises: b1888bf2fe7b
Create Date: 2023-05-01 14:27:55.015845

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0cee7e46b900'
down_revision = 'b1888bf2fe7b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('day', schema=None) as batch_op:
        batch_op.add_column(sa.Column('day_complete', sa.Boolean(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('day', schema=None) as batch_op:
        batch_op.drop_column('day_complete')

    # ### end Alembic commands ###